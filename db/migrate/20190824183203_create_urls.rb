class CreateUrls < ActiveRecord::Migration[6.0]
  def change
    create_table :urls do |t|
      t.string :url, null: false
      t.string :shortcode, null: false

      t.timestamps
    end

    add_index :urls, :url, unique: true
    add_index :urls, :shortcode, unique: true
  end
end
