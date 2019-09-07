Rails.application.routes.draw do
  resources :urls, only: [:create, :index]
  resources :visits, only: [:index]
  get '*shortcode' => 'redirects#show', as: :redirects
  root to: 'urls#new'
end
