import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOneFood, addFlavor } from '../services/food';

export default function FoodDetail({ flavors, currentUser }) {
  const [food, setFood] = useState(null);
  const [flavorId, setFlavorId] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchFood = async () => {
      const foodItem = await getOneFood(id);
      setFood(foodItem);
    };
    fetchFood();
  }, [id]);

  const handleChange = (e) => {
    const { value } = e.target;
    setFlavorId(value);
  };
  // Our handle submit for adding the flavor to our food
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFlavors = await addFlavor({ flavor_id: flavorId, food_id: id });
    setFood((prevState) => ({ ...prevState, flavors: newFlavors }));
  };

  return (
    <div>
      <h3>{food?.name}</h3>
      {food?.flavors.map((flavor) => (
        <p key={`list${flavor.id}`}>{flavor.name}</p>
      ))}

      {currentUser?.id === food?.user_id && (
        <form onSubmit={handleSubmit}>
          {/* below is our for for the flavor drop down */}
          <select onChange={handleChange} defaultValue='default'>
            {/* we can set a default value to tell people to select a flavor*/}
            {/* the "defaultValue" on the <select> tag needs to match the "value" on our default <option> tag */}
            {/* we also add the "disabled" in the <option> to prevent users from selecting it*/}
            <option disabled value='default'>
              -- Select a Flavor --
            </option>
            {/* now we loop over all flavors and return an <option> tag for each */}

            {flavors.map((flavor) => (
              // we track the flavor's id as the "value" which will get added to state onChange
              // the flavor's name goes between the open and close tag which is what the user sees
              <option value={flavor.id} key={`select${flavor.id}`}>
                {flavor.name}
              </option>
            ))}
          </select>
          <button>Add</button>
        </form>
      )}
    </div>
  );
}
