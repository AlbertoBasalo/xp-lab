const activitiesService = require("./activities.service");

async function getActivities(req, res, next) {
  try {
    const body = await activitiesService.readActivities();
    res.json(body);
  } catch (error) {
    next(error);
  }
}

async function getActivity(req, res, next) {
  try {
    const id = getIdFromUrl(req);
    const body = await activitiesService.readActivity(id);
    res.json(body);
  } catch (error) {
    next(error);
  }
}

async function getActivityBookings(req, res, next) {
  try {
    const id = getIdFromUrl(req);
    const body = await activitiesService.readActivityBookings(id);
    res.json(body);
  } catch (error) {
    next(error);
  }
}

async function postActivity(req, res, next) {
  try {
    const body = await activitiesService.createActivity(req.body);
    res.status(201).json(body);
  } catch (error) {
    next(error);
  }
}

async function putActivity(req, res, next) {
  try {
    const id = getIdFromUrl(req);
    const body = await activitiesService.updateActivity(id, req.body);
    res.json(body);
  } catch (error) {
    next(error);
  }
}

async function deleteActivity(req, res, next) {
  try {
    const id = getIdFromUrl(req);
    await activitiesService.deleteActivity(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

// Todo: Move to a common place
function getIdFromUrl(req) {
  const id = req.params.id;
  if (!id) {
    throw new AppError("Id is required", "VALIDATION", 400);
  }
  if (isNaN(id)) {
    throw new AppError("Id must be a number", "VALIDATION", 400);
  }
  return id;
}

/**
 * Process requests and generates responses for the Activities EndPoint
 * @description deals with API logic, calling services and sending responses
 */
const activitiesController = {
  getActivities,
  getActivity,
  getActivityBookings,
  postActivity,
  putActivity,
  deleteActivity,
};

module.exports = activitiesController;
