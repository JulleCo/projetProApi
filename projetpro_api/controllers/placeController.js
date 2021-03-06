const models = require("../models");
const {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
  NotFoundError,
} = require("../utils/errors");

module.exports = {
  addPlace: async (request, response) => {
    const place = {
      type: request.body.type,
      location: request.body.location,
      animaux: request.body.animaux,
      personMax: request.body.personMax,
      description: request.body.description,
      picture: request.body.picture,
    };

    for (const key in place) {
      if (place[key] === null) {
        throw new BadRequestError("Bad Request", `Input ${key} must be filled`);
      }
    }
    const newPlace = await models.Place.create({
      type: place.type,
      userId: request.body.userId,
      location: place.location,
      animaux: place.animaux,
      personMax: place.personMax,
      description: place.description,
      picture: place.picture,
    });

    response.status(201).json({
      type: newPlace.type,
      userId: newPlace.userId,
      location: newPlace.location,
      animaux: newPlace.animaux,
      personMax: newPlace.personMax,
      description: newPlace.description,
      picture: newPlace.picture,
    });
  },
  editPlace: async (request, response) => {
    const getPlaceId = request.params.id;
    const initialStatePlace = await models.Place.findOne({
      attributes: [
        "id",
        "type",
        "userId",
        "location",
        "animaux",
        "personMax",
        "description",
        "picture",
      ],
      where: { id: getPlaceId },
    });

    if (!initialStatePlace) {
      throw new NotFoundError(
        "Resource not found",
        "There is nothing to find at that url, the ID does not exist"
      );
    }

    let inputStatePlace = {
      type: request.body.type,
      location: request.body.location,
      animaux: request.body.animaux,
      personMax: request.body.personMax,
      description: request.body.description,
      picture: request.body.picture,
    };
    if (
      initialStatePlace.type === inputStatePlace.type &&
      initialStatePlace.location === inputStatePlace.location &&
      initialStatePlace.animaux === inputStatePlace.animaux &&
      initialStatePlace.personMax === inputStatePlace.personMax &&
      initialStatePlace.description === inputStatePlace.description &&
      initialStatePlace.picture === inputStatePlace.picture
    ) {
      throw new BadRequestError(
        "Bad Request",
        "No need to update, you didn't modified anything"
      );
    }

    for (const key in inputStatePlace) {
      if (inputStatePlace[key] === "") {
        throw new BadRequestError("Bad Request", `Input ${key} must be filled`);
      }
    }

    const updatePlace = await models.Place.update(request.body, {
      where: { id: getPlaceId },
    });
    const updatedStatePlace = await models.Place.findOne({
      where: { id: updatePlace },
    });
    return response.status(201).json({ updatePlace, updatedStatePlace });
  },
  deletePlace: async (request, response) => {
    const placeId = request.params.id;
    const deletePlace = await models.Place.destroy({
      where: { id: placeId },
    });
    if (deletePlace) {
      response.status(201).json({ succes: "place post delete" });
    } else {
      throw new NotFoundError(
        "Resource not found",
        "The requested resource does not (or no longer) exist"
      );
    }
  },
  getPlaces: async (request, response) => {
    const placesFound = await models.Place.findAll({
      attributes: [
        "id",
        "type",
        "userId",
        "location",
        "animaux",
        "personMax",
        "description",
        "picture",
      ],
      order: [["id", "DESC"]],
      include: [
        {
          model: models.User,
          attributes: ["email", "firstName", "lastName"],
        },
      ],
    });

    response.status(200).json(placesFound);
  },
  getPlaceById: async (request, response) => {
    const foundPlaceById = await models.Place.findOne({
      attributes: [
        "id",
        "type",
        "userId",
        "location",
        "animaux",
        "personMax",
        "description",
        "picture",
      ],
      where: {
        id: request.params.id,
      },
      include: [
        {
          model: models.User,
          attributes: ["email", "firstName", "lastName"],
        },
      ],
    });
    if (foundPlaceById == null) {
      throw new NotFoundError(
        "Resource not found",
        "The place you are looking for does not exist in our database"
      );
    }

    response.status(201).json({
      id: foundPlaceById.id,
      userId: foundPlaceById.userId,
      type: foundPlaceById.type,
      location: foundPlaceById.location,
      animaux: foundPlaceById.animaux,
      personMax: foundPlaceById.personMax,
      description: foundPlaceById.description,
      picture: foundPlaceById.picture,
      userEmail: foundPlaceById.User.email,
      userFirstName: foundPlaceById.User.firstName,
      userLastName: foundPlaceById.User.lastName,
    });
  },
  getPlacesByUser: async (request, response) => {
    const userById = await models.User.findOne({
      attributes: ["id"],
      where: {
        id: request.params.userId,
      },
    });

    const foundPlaceByUser = await models.Place.findAll({
      attributes: [
        "id",
        "type",
        "userId",
        "location",
        "animaux",
        "personMax",
        "description",
        "picture",
      ],
      where: {
        userId: userById.id,
      },
      include: [
        {
          model: models.User,
          attributes: ["email", "firstName", "lastName"],
        },
      ],
    });

    response.status(201).json(foundPlaceByUser);
  },
};
