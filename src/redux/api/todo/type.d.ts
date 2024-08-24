namespace TODO {
  type GetRespone = ITodo[];
  type GetRequest = void;

  type PostRespone = ITodo[];
  type PostRequest = ITodo;

  type DeleteRespone = ITodo[];
  type DeleteRequest = number;

  type EditRespone = ITodo[];
  type EditRequest = {
    _id?: number;
    data: ITodo;
  };
}
