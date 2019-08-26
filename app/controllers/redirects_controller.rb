class RedirectsController < ApplicationController
  def show
    url = Url.find_by(shortcode: params[:shortcode])
    redirect_to url.url
  end
end
