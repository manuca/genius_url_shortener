class CreateVisits < ActiveRecord::Migration[6.0]
  def change
    create_table :visits do |t|
      t.references :url, null: false, foreign_key: true
      t.string :ip, null: false

      t.timestamps
    end
  end
end
