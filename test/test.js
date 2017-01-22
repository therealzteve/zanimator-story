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
            'squareShape': "$1",
            'color': '#000000'
          }
        }
      },
      {
        'action': 'add',
        'data': {
          'parent': '$0',
          'child': '$1'
        }
      }]
    ]
  ]
}
