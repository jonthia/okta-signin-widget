define({
  "status": 200,
  "responseType": "json",
  "response": {
    "stateToken": "testStateToken",
    "expiresAt": "2015-09-27T01:14:24.573Z",
    "status": "MFA_CHALLENGE",
    "_embedded": {
      "user": {
        "id": "00ui5n6MuauCZVNbX0g3",
        "passwordChanged": "2016-03-26T22:29:11.000Z",
        "profile": {
          "login": "administrator1@clouditude.net",
          "firstName": "Add-Min",
          "lastName": "O'Cloudy Tud",
          "locale": "en_US",
          "timeZone": "America/Los_Angeles"
        }
      },
      "factor": {
        "id": "clfk6mRsVLrhHznVe0g3",
        "factorType": "call",
        "provider": "OKTA",
        "profile": {
          "phoneNumber": "+1 XXX-XXX-7799"
        },
        "_embedded": {
          "verification": null
        }
      }
    },
    "_links": {
      "next": {
        "name": "verify",
        "href": "https://foo.com/api/v1/authn/factors/clfk6mRsVLrhHznVe0g3/verify",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "cancel": {
        "href": "https://foo.com/api/v1/authn/cancel",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "prev": {
        "href": "https://foo.com/api/v1/authn/previous",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "resend": [
        {
          "name": "call",
          "href": "https://foo.com/api/v1/authn/factors/clfk6mRsVLrhHznVe0g3/verify/resend",
          "hints": {
            "allow": [
              "POST"
            ]
          }
        }
      ]
    }
  }
});
