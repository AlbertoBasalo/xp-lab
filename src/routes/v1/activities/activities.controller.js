const activitiesService = require("./activities.service");

async function getActivities(req, res, next) {
  try {
    const data = await activitiesService.readActivities();
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function getActivity(req, res, next) {
  try {
    const id = req.params.id;
    const data = await activitiesService.readActivity(id);
    if (!data) {
      return res.status(404).send({
        message: `Activity with id: ${id} not found `,
      });
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function getActivityBookings(req, res, next) {
  try {
    const id = req.params.id;
    const data = await activitiesService.readActivityBookings(id);
    if (!data) {
      return res.status(404).send({
        message: `Activity with id: ${id} not found `,
      });
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function postActivity(req, res, next) {
  try {
    const data = await activitiesService.createActivity(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
}

async function putActivity(req, res, next) {
  try {
    const id = req.params.id;
    const data = await activitiesService.updateActivity(id, req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function deleteActivity(req, res, next) {
  try {
    const id = req.params.id;
    await activitiesService.deleteActivity(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
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
