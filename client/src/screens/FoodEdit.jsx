import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function FoodEdit({ foods, handleFoodUpdate }) {
  const [formData, setFormData] = useState({
    name: '',
  });
  const { name } = formData;
  const { id } = useParams();

  useEffect(() => {
    const prefillFormData = () => {
      const foodItem = foods.find((food) => food.id === Number(id));
      setFormData({ name: foodItem.name });
    };
    if (foods.length) prefillFormData();
  }, [foods, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleFoodUpdate(id, formData);
      }}
    >
      <h3>Edit Food</h3>
      <label>
        Name:
        <input type='text' name='name' value={name} onChange={handleChange} />
      </label>
      <button>Submit</button>
    </form>
  );
}
