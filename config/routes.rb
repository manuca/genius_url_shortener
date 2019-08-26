Rails.application.routes.draw do
  resources :urls, only: [:create]
  get '*shortcode' => 'redirects#show'
  root to: 'urls#new'
end
