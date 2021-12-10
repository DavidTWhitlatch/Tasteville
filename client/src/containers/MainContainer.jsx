import { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import FoodCreate from '../screens/FoodCreate';
import FoodEdit from '../screens/FoodEdit';
import Foods from '../screens/Foods';
import FoodDetail from '../screens/FoodDetail';
import { getAllFoods, postFood, putFood, deleteFood } from '../services/food';
import { getAllFlavors } from '../services/flavor';
import Flavors from '../screens/Flavors';

export default function MainContainer({ currentUser }) {
  const [foods, setFoods] = useState([]);
  const [flavors, setFlavors] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchFoods = async () => {
      const foodList = await getAllFoods();
      setFoods(foodList);
    };
    fetchFoods();
  }, []);

  useEffect(() => {
    const fetchFlavors = async () => {
      const flavorList = await getAllFlavors();
      setFlavors(flavorList);
    };
    fetchFlavors();
  }, []);

  const handleFoodCreate = async (formData) => {
    const newFood = await postFood(formData);
    setFoods((prevState) => [...prevState, newFood]);
    history.push('/foods');
  };

  const handleFoodUpdate = async (id, formData) => {
    const newFood = await putFood(id, formData);
    setFoods((prevState) =>
      prevState.map((food) => {
        return food.id === Number(id) ? newFood : food;
      })
    );
    history.push('/foods');
  };

  const handleFoodDelete = async (id) => {
    await deleteFood(id);
    setFoods((prevState) => prevState.filter((food) => food.id !== id));
  };

  return (
    <div>
      <Switch>
        <Route path='/foods/:id/edit'>
          <FoodEdit foods={foods} handleFoodUpdate={handleFoodUpdate} />
        </Route>
        <Route path='/foods/new'>
          <FoodCreate handleFoodCreate={handleFoodCreate} />
        </Route>
        <Route path='/foods/:id'>
          <FoodDetail flavors={flavors} currentUser={currentUser} />
        </Route>
        <Route path='/foods'>
          <Foods
            foods={foods}
            handleFoodDelete={handleFoodDelete}
            currentUser={currentUser}
          />
        </Route>
        <Route path='/flavors'>
          <Flavors flavors={flavors} />
        </Route>
        <Route path='/'>
          <h1>Home</h1>
        </Route>
      </Switch>
    </div>
  );
}
