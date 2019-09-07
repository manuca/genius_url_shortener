Rails.application.routes.draw do
  resources :urls, only: [:create, :index]
  resources :visits, only: [:index]
  get '*shortcode' => 'redirects#show'
  root to: 'urls#new'
end
