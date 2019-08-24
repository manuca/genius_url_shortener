class UrlsController < ApplicationController
  protect_from_forgery except: :create

  def new
    @url = Url.new
  end

  def create
    url = Url.new(url_params)

    if url.save
      render json: { shortcode: url.shortcode }, status: :created
    else
      render json: { errors: {} }, status: :unprocessable_entity
    end
  end

  private

  def url_params
    params.permit(:url)
  end
end
