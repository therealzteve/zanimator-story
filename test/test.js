var testData = {
  timeSlots: [
    [
      [{
        'action': 'create',
        'data': {
          'id': '1',
          'type': 'geometry.shapes.square',
          'options': {
            'sidelength': 10
          }
        }
      },
      {
        'action': 'create',
        'data': {
          'id': 2,
          'type': 'factory.square',
          'options': {
            'squareShape': '$1',
            'color': '#000000'
          }
        }
      },
      {
        'action': 'add',
        'data': {
          'parent': '$0',
          'child': '$2'
        }
      }],
      [{
        'action': 'prop',
        'data': {
          'id': '2',
          'options': {
            'color': '#AAAAAA'
          }
        }
      }],
      [{
        'action': 'prop',
        'data': {
          'id': '2',
          'options': {
            'color': '#999999'
          }
        }
      }],
      [{
        'action': 'prop',
        'data': {
          'id': '2',
          'options': {
            'color': '#444444'
          }
        }
      }]
    ]
  ]
};
