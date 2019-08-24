class UrlsController < ApplicationController
  def new
    @url = Url.new
    render plain: "ok"
  end

  def create
  end
end
