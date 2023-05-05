import { Relay } from "../../../src/lib/events/Relay";
import { SessionState } from "../../../src/lib/state/session/SessionState";
import {
  CustomEventWithDetail,
  sessionCreatedType,
  SessionEventDetail,
  sessionExpiredType,
  sessionResumedType,
  userDeletedType,
  userLoggedOutType,
} from "../../../src/lib/events/CustomEvents";

describe("Relay", () => {
  let relay: Relay;
  let dispatcherSpy: jest.SpyInstance;

  beforeEach(() => {
    relay = new Relay();
    dispatcherSpy = jest.spyOn(relay, "_dispatchEvent");
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  describe("dispatchInitialSessionResumedEvent", () => {
    it("should dispatch the initial 'hanko-user-logged-out' event when no session is active", () => {
      jest
        .spyOn(relay._sessionState, "read")
        .mockReturnValueOnce(new SessionState());
      jest
        .spyOn(relay._sessionState, "getExpirationSeconds")
        .mockReturnValueOnce(0);
      jest.spyOn(relay._cookie, "getAuthCookie").mockReturnValueOnce("");
      jest
        .spyOn(relay._sessionState, "getUserID")
        .mockReturnValueOnce("fake_user");

      relay.dispatchInitialEvents();
      const event = dispatcherSpy.mock
        .calls[0][0] as CustomEventWithDetail<SessionEventDetail>;
      expect(event.type).toEqual(userLoggedOutType);
      expect(dispatcherSpy).toHaveBeenCalled();
      expect(relay._cookie.getAuthCookie).toHaveBeenCalled();
    });

    it("should dispatch initial 'hanko-session-resumed' event when session is active", () => {
      jest
        .spyOn(relay._sessionState, "read")
        .mockReturnValueOnce(new SessionState());
      jest
        .spyOn(relay._sessionState, "getExpirationSeconds")
        .mockReturnValueOnce(1);
      jest.spyOn(relay._cookie, "getAuthCookie").mockReturnValueOnce("");
      jest
        .spyOn(relay._sessionState, "getUserID")
        .mockReturnValueOnce("fake_user");

      relay.dispatchInitialEvents();
      const event = dispatcherSpy.mock
        .calls[0][0] as CustomEventWithDetail<SessionEventDetail>;
      expect(event.type).toEqual(sessionResumedType);
      expect(dispatcherSpy).toHaveBeenCalled();
    });

    // eslint-disable-next-line jest/no-disabled-tests
    it.skip("should listen to 'hanko-session-created' events and dispatch 'hanko-session-removed' events", () => {
      const mockSessionCreatedDetail = {
        userID: "test-user",
        jwt: "test-token",
        expirationSeconds: 7,
      };
      const sessionCreatedEventMock = new CustomEventWithDetail(
        sessionCreatedType,
        mockSessionCreatedDetail
      );

      // Outdated tasks to be cleaned up
      relay._scheduler._tasks = [
        {
          func: () => {},
          timeoutID: 1,
          type: "hanko-session-removed",
        },
        {
          func: () => {},
          timeoutID: 2,
          type: "hanko-session-removed",
        },
      ];

      document.dispatchEvent(sessionCreatedEventMock);

      // Only the new task should be there
      expect(relay._scheduler._tasks).toStrictEqual([
        {
          func: expect.any(Function),
          timeoutID: expect.any(Number),
          type: sessionExpiredType,
        },
      ]);

      jest.advanceTimersByTime(3000);

      // Dispatching is expected after 7000ms.
      expect(dispatcherSpy).not.toHaveBeenCalled();

      // Should cause another cleanup and new task to be scheduled to dispatch the session-removed event.
      document.dispatchEvent(sessionCreatedEventMock);

      expect(relay._scheduler._tasks).toStrictEqual([
        {
          func: expect.any(Function),
          timeoutID: expect.any(Number),
          type: sessionExpiredType,
        },
      ]);

      jest.advanceTimersByTime(4000);

      // The second session-created event should have delayed the dispatching.
      expect(dispatcherSpy).not.toHaveBeenCalled();

      jest.advanceTimersByTime(3000);

      expect(dispatcherSpy).toHaveBeenCalled();
      expect(dispatcherSpy.mock.calls[0][0].type).toEqual(sessionExpiredType);
    });
  });

  it("should listen to 'hanko-session-removed' and remove scheduled events", () => {
    const mockSessionCreatedDetail = {
      userID: "test-user",
      jwt: "test-token",
      expirationSeconds: 7,
    };
    const sessionCreatedEventMock = new CustomEventWithDetail(
      sessionCreatedType,
      mockSessionCreatedDetail
    );
    const sessionRemovedEventMock = new CustomEventWithDetail(
      sessionExpiredType,
      null
    );

    document.dispatchEvent(sessionCreatedEventMock);

    expect(relay._scheduler._tasks).toStrictEqual([
      {
        func: expect.any(Function),
        timeoutID: expect.any(Number),
        type: sessionExpiredType,
      },
    ]);

    document.dispatchEvent(sessionRemovedEventMock);

    expect(relay._scheduler._tasks).toStrictEqual([]);

    jest.advanceTimersByTime(7000);
    const event = dispatcherSpy.mock.calls[0][0] as CustomEventWithDetail<null>;
    expect(dispatcherSpy).toBeCalledTimes(1);
    expect(event.type).not.toEqual(sessionExpiredType);
  });

  it("should listen to 'hanko-user-deleted' and remove scheduled events", () => {
    const mockSessionCreatedDetail = {
      userID: "test-user",
      jwt: "test-token",
      expirationSeconds: 7,
    };
    const sessionCreatedEventMock = new CustomEventWithDetail(
      sessionCreatedType,
      mockSessionCreatedDetail
    );
    const userDeletedEventMock = new CustomEventWithDetail(
      userDeletedType,
      null
    );

    document.dispatchEvent(sessionCreatedEventMock);
    document.dispatchEvent(userDeletedEventMock);

    expect(relay._scheduler._tasks).toStrictEqual([]);

    jest.advanceTimersByTime(7000);

    expect(dispatcherSpy.mock.calls[0][0].type).not.toEqual(sessionExpiredType);
    expect(dispatcherSpy).toBeCalledTimes(1);
  });

  it("should listen to 'storage' events and dispatch 'hanko-session-removed' if the session is expired", () => {
    jest.spyOn(relay._sessionState, "getUserID").mockReturnValue("");
    jest.spyOn(relay._cookie, "getAuthCookie").mockReturnValue("");
    jest.spyOn(relay._sessionState, "getExpirationSeconds").mockReturnValue(0);

    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "hanko_session",
      })
    );

    expect(dispatcherSpy).toHaveBeenCalled();
    expect(dispatcherSpy.mock.calls[0][0].type).toEqual(sessionExpiredType);
  });

  it("should listen to 'storage' events and dispatch 'hanko-session-created' if session is active", () => {
    jest.spyOn(relay._sessionState, "getUserID").mockReturnValue("test-user");
    jest.spyOn(relay._cookie, "getAuthCookie").mockReturnValue("test-jwt");
    jest.spyOn(relay._sessionState, "getExpirationSeconds").mockReturnValue(10);

    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "hanko_session",
      })
    );

    expect(dispatcherSpy).toHaveBeenCalled();
    expect(dispatcherSpy.mock.calls[0][0].type).toEqual(sessionCreatedType);
  });
});
