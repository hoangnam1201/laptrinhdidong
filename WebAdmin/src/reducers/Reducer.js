export default function reducer(state, action) {
  switch (action.type) {
    case "CURRENT_USER":
      return { ...state, user: action.payload };
    case "GET_ALL_POSTS":
      return { ...state, posts: action.payload };
    case "CREATE_ONE_POSTS":
      return { ...state, posts: [...state.posts, action.payload] };
    case "UPDATE_ONE_POSTS":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id
            ? { ...post, ...action.payload }
            : post
        ),
      };
    case "DELETE_ONE_POSTS":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload._id),
      };
    case "GET_ALL_BUS":
      return { ...state, bus: action.payload };
    case "CREATE_ONE_BUS":
      return { ...state, bus: [...state.bus, action.payload] };
    case "UPDATE_ONE_BUS":
      return {
        ...state,
        bus: state.bus.map((bus) =>
          bus._id === action.payload._id ? { ...bus, ...action.payload } : bus
        ),
      };
    case "DELETE_ONE_BUS":
      return {
        ...state,
        bus: state.bus.filter((bus) => bus._id !== action.payload._id),
      };
    case "GET_ALL_BUSSTOPS":
      return { ...state, busstop: action.payload };
    case "CREATE_ONE_BUSSTOPS":
      return { ...state, busstop: [...state.busstop, action.payload] };
    case "UPDATE_ONE_BUSSTOPS":
      return {
        ...state,
        busstop: state.busstop.map((busstop) =>
          busstop._id === action.payload._id
            ? { ...busstop, ...action.payload }
            : busstop
        ),
      };
    case "DELETE_ONE_BUSSTOPS":
      return {
        ...state,
        busstop: state.busstop.filter(
          (busstop) => busstop._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
}
