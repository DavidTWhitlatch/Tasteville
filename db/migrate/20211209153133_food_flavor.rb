class FoodFlavor < ActiveRecord::Migration[6.1]
  def change
    create_join_table :foods, :flavors
  end
end
