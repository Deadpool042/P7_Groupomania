import {
  DELETE_COMMENT,
  DELETE_POST,
  EDIT_COMMENT,
  GET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  UPDATE_POST,
} from "../actions/post.actions";

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;

    case LIKE_POST:
      return state.map((post) => {
        if (post.id === action.payload.PostId) {
          return {
            ...post,
            Likes: [action.payload, ...post.Likes],
          };
        }

        return post;
      });

    case UNLIKE_POST:
      return state.map((post) => {
        const likesTab = post.Likes;
        if (post.id === action.payload.PostId) {
          return {
            ...post,
            Likes: likesTab.filter((id) => id.UserId !== action.payload.userId),
          };
        }
        return post;
      });

    case UPDATE_POST:
      return state.map((post) => {
        console.log(action.payload);
        if (post.id === action.payload.PostId) {
          return {
            ...post,
            postText: action.payload.postText,
          };
        } else return post;
      });

    case DELETE_POST:
      return state.filter((post) => post.id !== action.payload.PostId);

    case EDIT_COMMENT:
      return state.map((post) => {
        if (post.id === action.payload.PostId) {
          return {
            ...post,
            Comments: post.Comments.map((comment) => {
              if (post.Comments.id === action.payload.commentId) {
                return {
                  ...comment,
                  commentBody: action.payload.commentBody,
                };
              } else {
                return comment;
              }
            }),
          };
        } else return post;
      });

    case DELETE_COMMENT:
      return state.map((post) => {
        if (post.id === action.payload.PostId) {
          return {
            ...post,
            Comments: post.Comments.filter(
              (comment) => comment.commentId !== action.payload.commentId
            ),
          };
        } else return post;
      });

    default:
      return state;
  }
}
