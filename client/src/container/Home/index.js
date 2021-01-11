import { useContext } from "react";
import Heading from "../../components/Header";
import ListItem from "./components/ListItem";
import List from "./components/List";
import Container from "../../components/Container";
import { Link } from "react-router-dom";
import { store } from "../../hooks/useListProvider";
import NoItem from "./components/NoItem";

export default function Home() {
  let { state } = useContext(store);
  let { data } = state;

  return (
    <Container>
      <Heading>
        <div className="ml-4 mt-2">
          <h3 className="uppercase  text-lg leading-6 font-medium text-gray-900">
            TO-DO LIST
          </h3>
        </div>
        <div className="ml-4 mt-2 flex-shrink-0">
          <Link to="/new-task">
            <button
              type="button"
              className="uppercase  relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              //   onClick={toggleAdd}
            >
              create new task
            </button>
          </Link>
        </div>
      </Heading>
      <List>
        {data.length > 0 ? (
          data.map(({ id, title, completed, ...rest }) => (
            <ListItem id={id} key={id} checked={completed}>
              {title}
            </ListItem>
          ))
        ) : (
          <NoItem />
        )}
      </List>
    </Container>
  );
}
