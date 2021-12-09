# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Flavor.destroy_all
Food.destroy_all
User.destroy_all

@admin = User.create!(username: 'Pawpaw', email: 'pawpaw@email.com', password: '123456')

puts "#{User.count} users created"

Flavor.create!(name: 'sweet')
Flavor.create!(name: 'salty')
Flavor.create!(name: 'bitter')
Flavor.create!(name: 'sour')
Flavor.create!(name: 'umami')

puts "#{Flavor.count} flavors created"

10.times do
  Food.create!(name: Faker::Food.dish, user: @admin)
end

puts "#{Food.count} foods created"

@first_food = Food.first

Food.all.each do |food|
  @flavors = Flavor.all.shuffle
  rand(1..5).times do |i|
    food.flavors << @flavors[i]
  end
  puts "#{food.flavors.length} flavors added"
end
