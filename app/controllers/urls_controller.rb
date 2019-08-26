class UrlsController < ApplicationController
  protect_from_forgery except: :create

  def new
    @url = Url.new
  end

  def create
    url = Url.find_or_create_by(url_params)

    if url.save
      render json: { shortcode: url.shortcode }, status: :created
    else
      render json: { errors: url.errors.to_h }, status: :unprocessable_entity
    end
  end

  private

  def url_params
    params.permit(:url)
  end
end
