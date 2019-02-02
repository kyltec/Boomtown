const UPDATE_ITEM = 'UPDATE_ITEM';
const RESET_IMAGE = 'RESET_IMAGE';
const RESET_ITEM = 'RESET_ITEM';

export const updateItem = item => ({
  type: UPDATE_ITEM,
  payload: item
});

export const resetImage = () => ({
  type: RESET_IMAGE
});

export const resetItem = () => ({
  type: RESET_ITEM
});

const initialState = {
  title: 'Name Your Item',
  description: 'Describe Your Item',
  tags: [],
  imageurl: 'http://via.placeholder.com/350x250?text=Please select an image',
  itemowner: {},
  created: new Date()
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ITEM: {
      return { ...state, ...action.payload };
    }
    case RESET_ITEM: {
      console.log('more testing', action, initialState);
      return { ...initialState };
    }
    case RESET_IMAGE: {
      return { ...state, imageurl: initialState.imageurl };
    }
    default: {
      return state;
    }
  }
};
