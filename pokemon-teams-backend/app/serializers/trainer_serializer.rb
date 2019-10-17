class TrainerSerializer
  def initialize(serialize)
    @serialize = serialize
  end

  def serialize
    options = {
      include: {
        pokemons: {
          only: [:id, :nickname, :species, :trainer_id]
        }
      },
      except: [:updated_at, :created_at]
    }
    @serialize.to_json(options)
  end
end
