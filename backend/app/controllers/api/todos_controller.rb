class Api::TodosController < ApplicationController
  before_action :set_todo, only: %i[ update destroy ]

  # GET /api/todos
  def index
    @todos = Todo.all.order(created_at: :desc)
    render json: @todos
  end

  # POST /api/todos
  def create
    @todo = Todo.new(todo_params)

    if @todo.save
      render json: @todo, status: :created
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/todos/1
  def update
    if @todo.update(todo_params)
      render json: @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/todos/1
  def destroy
    @todo.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_todo
      @todo = Todo.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def todo_params
      params.require(:todo).permit(:title, :completed)
    end
end 