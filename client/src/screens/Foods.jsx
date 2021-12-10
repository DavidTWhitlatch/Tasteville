import React from 'react';
import { Link } from 'react-router-dom';

export default function Foods({ foods, handleFoodDelete }) {
  return (
    <div>
      <h3>Foods</h3>
      {foods.map((food) => (
        <div key={food.id}>
          <Link to={`/foods/${food.id}`}>
            <p>{food.name}</p>
          </Link>
          <Link to={`/foods/${food.id}/edit`}>
            <button>Edit</button>
          </Link>
          <button onClick={() => handleFoodDelete(food.id)}>Delete</button>
        </div>
      ))}
      <Link to='/foods/new'>
        <button>Create</button>
      </Link>
    </div>
  );
}
