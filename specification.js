// GET flights from a to b on d1 and back on d2
const req0 = {
  from: 'a'.id,
  to: 'b'.id,
  on: 'd1',
  back: 'd2',
};

const res0 = {
  outbound: {
    direct: [{
      flightId: '',
      planeId: '',
      from: 'a'.name,
      to: 'b'.name,
      departureTime: '',
      arrivalTime: '',
      price: {
        _id: '',
        amount: '',
        expires: '',
      },
    }],
    connecting: [[{
      flightId: '',
      planeId: '',
      from: 'a'.name,
      to: 'a1'.name,
      departureTime: '',
      arrivalTime: '',
      price: {
        _id: '',
        amount: '',
        expires: '',
      },
    }]],
  },
  inbound: {
    direct: [],
    connecting: [],
  },
};

// GET scheme of the plane p
const req1 = {
  id: 'p'.id,
};

const res1 = [
  [
    {
      id: 1,
      type: 'w', // window seat
    },
    {
      id: 2,
      type: 'm', // middle seat
    },
    {
      id: 3,
      type: 'p', // passage seat
    },
  ],
  [],
];

// POST Order ticket
const req2 = {
  flightId: '',
  priceId: '',
  seatId: '',
};

const res2 = {
  ticketId: '',
};
