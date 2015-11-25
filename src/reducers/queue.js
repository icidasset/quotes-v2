import * as types from '../constants/action_types/queue';


const initialState = {
  items: [],
  history: [],

  activeItem: null,
  shuffle: false,
  repeat: false,
};


export default function queue(state = initialState, action) {
  let newItems;
  let newHistory;
  let newActiveItem;

  switch (action.type) {
  case types.SHIFT_QUEUE:
    if (state.activeItem) {
      newHistory = [...state.history, state.activeItem];
    } else {
      newHistory = [...state.history];
    }

    newActiveItem = state.items.shift();

    return {
      items: [...state.items],
      history: newHistory,

      activeItem: newActiveItem,
    };


  case types.UNSHIFT_QUEUE:
    if (state.activeItem) {
      newItems = state.items.slice(0, state.items.length - 1);
      newItems.unshift(state.activeItem);
    }

    newActiveItem = state.history.pop();

    if (newActiveItem) {
      return {
        items: newItems || [],
        history: [...state.history],

        activeItem: newActiveItem,
      };

    }

    return state;


  case types.REFRESH_QUEUE:
    // TODO:
    // - remove old items from
    //   `state.queue.items`,
    //   `state.queue.history`,
    //   `state.queue.activeItem`

    return state;


  case types.REFILL_QUEUE:
    return Object.assign({}, state, {
      items: state.items.concat(action.newItems),
    });


  case types.TOGGLE_SHUFFLE:
    return Object.assign({}, state, {
      shuffle: !state.shuffle,
    });


  case types.TOGGLE_REPEAT:
    return Object.assign({}, state, {
      repeat: !state.repeat,
    });


  default:
    return state;
  }
}
