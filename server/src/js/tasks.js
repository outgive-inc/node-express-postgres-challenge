const { text } = require('body-parser');
const uuid = require('uuid/v4');

const PERMITTED_KEYS = ['title', 'details', 'completed'];

// Backend validations and functions

//filter params to only allow the permitted keys
const filterParams = function(taskParams) {
  Object.keys(taskParams).filter(param => {
    if( !PERMITTED_KEYS.includes(param)) delete taskParams[param]
  })
}

const findPresentKeys = function (taskParams) {
  let isTitlePresent = ('title' in taskParams) ? true : false;
  let isDetailsPresent = ('details' in taskParams) ? true : false;
  let isCompletedPresent = ('completed' in taskParams) ? true : false;
  return { isTitlePresent, isDetailsPresent, isCompletedPresent }
}

const isUUIDv4 = function (text) {
  let res = text.toLowerCase.match("^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$");
  if(res === null) {
    return false;
  }
  return true
}

// function that filters and validates the body parameters
const validateParams = function (taskParams) {
  let errorMessages = [];
  let isValid = true;

  //filter parameters first
  filterParams(taskParams);

  if( Object.keys(taskParams).length < 1) {
    errorMessages.push("No permitted key in body parameter.")
    isValid = false;
  }

  if( 'title' in taskParams && typeof taskParams.title != 'string') {
    errorMessages.push("Invalid title data type.");
    isValid = false;
  }

  if('title' in taskParams && taskParams.title.length < 1) {
    errorMessages.push("Title must be a non-empty string")
    isValid = false;
  }

  if( 'details' in taskParams && typeof taskParams.details != 'string') {
    errorMessages.push("Invalid details data type.");
    isValid = false;
  }
  
  if('completed' in taskParams && typeof taskParams.completed != 'boolean') {
    errorMessages.push("Invalid completed data type.");
    isValid = false;
  }
  return {"errors": errorMessages, "isValid": isValid};
}


// Build postgres query for new task depending on if the optional Keys: details, and completed are present
const buildNewTaskQuery = function(taskParams) {  
  let { isDetailsPresent, isCompletedPresent } = findPresentKeys(taskParams);
  let query = 
    `
      INSERT INTO tasks (id, title
        ${ isDetailsPresent ? ', details' : '' } 
        ${ isCompletedPresent ? ', completed' : '' }
      )
      VALUES(
        '${uuid()}'::uuid, 
        '${taskParams.title}'
        ${isDetailsPresent ? ", \'" + taskParams.details + "\'" : '' } 
        ${isCompletedPresent ? ", " + taskParams.completed : '' }
      );
      
    `
  return query;
}

// Build postgres query for update task depending on which Keys are present, absent Keys dont get updated
const buildUpdateTaskQuery = function(taskParams, id) {  
  let { isTitlePresent, isDetailsPresent, isCompletedPresent } = findPresentKeys(taskParams);

  let query = 
    `
      UPDATE tasks  
      SET 
        ${isTitlePresent ?      ("title = '" + taskParams.title + "'") : '' }            
        ${isTitlePresent && (isDetailsPresent || isCompletedPresent) ? ', ' : '' }
        ${isDetailsPresent ?    ("details = '" + taskParams.details + "'") : '' }
        ${(isDetailsPresent && isCompletedPresent) ? ', ' : ''}
        ${isCompletedPresent ?  ("completed = " + taskParams.completed) : '' }
      WHERE id='${id}'::uuid;
    `
  return query;
}

module.exports = { validateParams, buildNewTaskQuery,
                  buildUpdateTaskQuery, findPresentKeys, isUUIDv4};