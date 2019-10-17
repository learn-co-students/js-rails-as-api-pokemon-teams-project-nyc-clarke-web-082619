class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: PokemonSerialzier.new(pokemons);
    end

    def create
        trainer = Trainer.find(pokemonParams[:trainer_id])
        if trainer.pokemons.length < 6
            name = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            pokemon = Pokemon.new(nickname: name, species: species, trainer_id: pokemonParams[:trainer_id])
            pokemon.save;
            render json: pokemon
        else
            render json: ["too many pokemon"]
        end
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
        render json: PokemonSerializer.new(pokemon).serialize
    end

    def pokemonParams
        params.require('pokemon').permit('trainer_id')
    end
end
