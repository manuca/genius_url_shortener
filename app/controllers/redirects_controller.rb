class RedirectsController < ApplicationController
  def show
    url = Url.find_by(shortcode: params[:shortcode])
    url.visits.create(ip: request.remote_ip)
    redirect_to url.url
  end
end
