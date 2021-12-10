class FoodsController < ApplicationController
  before_action :set_food, only: :show
  before_action :authorize_request, only: [:create, :update, :destroy]
  before_action :set_user_food, only: [:update, :destroy]

  # GET /foods
  def index
    @foods = Food.all

    render json: @foods
  end

  # GET /foods/1
  def show
    render json: @food, include: :flavors
  end

  # POST /foods
  def create
    @food = Food.new(food_params)
    @food.user = @current_user
    if @food.save
      render json: @food, status: :created
    else
      render json: @food.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /foods/1
  def update
    if @food.update(food_params)
      render json: @food
    else
      render json: @food.errors, status: :unprocessable_entity
    end
  end

  # DELETE /foods/1
  def destroy
    @food.destroy
  end

  def add_flavor
    @food = Food.find(food_params[:food_id])
    @flavor = Flavor.find(food_params[:flavor_id])

    @food.flavors << @flavor

    render json: @food.flavors
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_food
    @food = Food.find(params[:id])
  end

  def set_user_food
    @food = @current_user.foods.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def food_params
    params.require(:food).permit(:name, :food_id, :flavor_id)
  end
end
