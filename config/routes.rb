Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'categories#index'

  resources :categories, only: %i[index create new] do
    resources :images, except: %i[destroy edit update]
  end
end
