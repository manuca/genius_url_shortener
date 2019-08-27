class VisitsController < ApplicationController
  def index
    @visits = Visit.includes(:url).all
  end
end
