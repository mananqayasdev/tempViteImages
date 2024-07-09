import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "./context";

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`;

const Gallery = () => {
  const { searchValue, setSearchValue } = useGlobalContext();
  const queryClient = useQueryClient();
  const response = useQuery({
    queryKey: ["images", searchValue],
    queryFn: async () => {
      const result = await axios.get(`${url}&query=${searchValue}`);

      return result.data;
    },
  });
  if (response.isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    );
  }
  if (response.isError) {
    return (
      <section className="image-container">
        <h4>There was an error..</h4>
      </section>
    );
  }
  const results = response.data.results;
  console.log(results);
  if (results.length < 1) {
    return (
      <section className="image-container">
        <h4>No results found..</h4>
      </section>
    );
  }
  return (
    <section className="image-container">
      {results.map((item) => {
        return (
          <img
            src={item?.urls?.regular}
            key={item.id}
            alt={item.alt_description}
            className="img"
          />
        );
      })}
    </section>
  );
};
export default Gallery;
