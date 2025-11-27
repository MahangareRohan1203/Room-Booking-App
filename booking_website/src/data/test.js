const locationsData = [
    {
        "locationId": 1,
        "name": "Marvel Sonnet",
        "description": null,
        "homes": [
            {
                "homeId": 1,
                "name": "Five Sharing",
                "description": null,
                "beds": [
                    {
                        "bedId": 1,
                        "name": "B1",
                        "description": null
                    },
                    {
                        "bedId": 2,
                        "name": "B2",
                        "description": null
                    },
                    {
                        "bedId": 3,
                        "name": "B3",
                        "description": null
                    },
                    {
                        "bedId": 4,
                        "name": "B4",
                        "description": null
                    },
                    {
                        "bedId": 5,
                        "name": "B5",
                        "description": null
                    }
                ]
            },
            {
                "homeId": 2,
                "name": "Four Sharing",
                "description": null,
                "beds": []
            },
            {
                "homeId": 3,
                "name": "Three Sharing",
                "description": null,
                "beds": []
            },
            {
                "homeId": 4,
                "name": "Deluxe Room",
                "description": null,
                "beds": []
            },
            {
                "homeId": 5,
                "name": "Single Room",
                "description": null,
                "beds": []
            }
        ]
    },
    {
        "locationId": 2,
        "name": "Nitron",
        "description": null,
        "homes": []
    },
    {
        "locationId": 3,
        "name": "Wadgaon Sheri B-1",
        "description": null,
        "homes": []
    },
    {
        "locationId": 4,
        "name": "Wadgaon Sheri B-2",
        "description": null,
        "homes": []
    }
]

var bookedData = [
    {
        "createdAt": "2025-04-13T12:27:08.134108",
        "updatedAt": "2025-04-13T12:27:08.134108",
        "bookingId": 10,
        "fromDate": "2025-04-15T00:00:00",
        "toDate": "2025-04-15T00:00:00",
        "isDeleted": false,
        "customer": {
            "customerId": 5,
            "name": "testBook-1",
            "mobileNumber": "81048"
        },
        "bedId": 1
    },
    {
        "createdAt": "2025-04-13T11:26:27.302251",
        "updatedAt": "2025-04-13T12:59:55.79881",
        "bookingId": 8,
        "fromDate": "2025-04-15T00:00:00",
        "toDate": "2025-04-16T00:00:00",
        "isDeleted": false,
        "customer": {
            "customerId": 3,
            "name": "testBook-2",
            "mobileNumber": "1757"
        },
        "bedId": 2
    },
    {
        "createdAt": "2025-04-13T11:59:29.368697",
        "updatedAt": "2025-04-13T11:59:29.368697",
        "bookingId": 9,
        "fromDate": "2025-04-11T00:00:00",
        "toDate": "2025-04-13T00:00:00",
        "isDeleted": false,
        "customer": {
            "customerId": 4,
            "name": "testBook",
            "mobileNumber": "1757057"
        },
        "bedId": 3
    },
    {
        "createdAt": "2025-04-13T12:27:08.17973",
        "updatedAt": "2025-04-13T12:27:08.17973",
        "bookingId": 11,
        "fromDate": "2025-04-15T00:00:00",
        "toDate": "2025-04-15T00:00:00",
        "isDeleted": false,
        "customer": {
            "customerId": 5,
            "name": "testBook-1",
            "mobileNumber": "81048"
        },
        "bedId": 4
    }
];

const test = bookedData.filter( a => a.bedId);
bookedData = test;

const updatedLocations = locationsData.map((location) => ({
    ...location,
    homes: location.homes.map((home) => ({
      ...home,
      beds: home.beds.map((bed) => ({
        ...bed,
        isBooked: bookedData.includes(bed.bedId),
      })),
    })),
  }));


console.log(updatedLocations[0].homes[0]);