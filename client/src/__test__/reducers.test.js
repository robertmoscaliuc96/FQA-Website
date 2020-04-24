import alertReducer from '../reducers/alert';

describe ('Alert Reducer', () =>{
    it('Should return default state', () => {
      const newState = alertReducer(undefined,{});
      expect(newState).toEqual([])
    })

  
  })