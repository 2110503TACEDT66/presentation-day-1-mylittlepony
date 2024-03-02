const express = require('express');
const {getHospitals, getHospital, createHospital, updateHospital, deleteHospital, getVacCenters} = require('../controllers/restaurants');

/**
 * @swagger
 * components:
 *   schemas: 
 *       Restaurant:
 *           type: object
 *           required:
 *               - name
 *               - address
 *           properties:
 *              id:
 *                  type: string
 *                  format: uuid
 *                  description: The auto-generated id of the restaurant
 *                  example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *              ลําดับ:
 *                  type: string
 *                  description: Ordinal number
 *              name:
 *                  type: string
 *                  description: Restaurant name
 *              address:
 *                  type: string
 *                  description: House No., Street, Road
 *              district:
 *                  type: string
 *                  description: District
 *              province:
 *                  type: string
 *                  description: province
 *              postalcode:
 *                  type: string
 *                  description: 5-digit postal code
 *              tel:
 *                  type: string
 *                  description: telephone number
 *              region:
 *                  type: string
 *                  description: region
 *           example:
 *              id: 609bda561452242d88d36e37
 *              ลําดับ: 121
 *              name: Happy Restaurant 
 *              address: 121 ถ.สุขุมวิท
 *              district: บางนา
 *              province: กรุงเทพมหานคร
 *              postalcode: 10110
 *              tel: 02-2187000
 *              region: กรุงเทพมหานคร (Bangkok)
 */

/**
    * @swagger
    * tags:
    *   name: Restaurants
    *   description: The restaurants managing API
    */

/**
* @swagger
* /restaurants:
*   get:
*       summary: Returns the list of all the restaurants
*       tags: [Restaurants]
*       responses:
*           200:
*               description: The list of the restaurants
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                               $ref: '#/components/schemas/Restaurant'
*/

/**
* @swagger
* /restaurants/{id}:
*   get:
*     summary: Get the restaurant by id
*     tags: [Restaurants]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The restaurant id
*     responses:
*       200:
*         description: The restaurant description by id
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Restaurant'
*       404:
*         description: The restaurant was not found
*/

/**
* @swagger
* /restaurants:
*   post:
*     summary: Create a new restaurant
*     tags: [Restaurants]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Restaurant'
*     responses:
*       201:
*         description: The restaurant was successfully created
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Restaurant'
*       500:
*         description: Some server error
*/

/**
* @swagger
* /restaurants/{id}:
*   put:
*     summary: Update the restaurant by the id
*     tags: [Restaurants]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The restaurant id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Restaurant'
*     responses:
*       200:
*         description: The restaurant was updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Restaurant'
*       404:
*         description: The restaurant was not found
*       500:
*         description: Some error happened
*/

/**
* @swagger
* /restaurants/{id}:
*   delete:
*     summary: Remove the restaurant by id
*     tags: [Restaurants]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The restaurant id
*     responses:
*       200:
*         description: The restaurant was deleted
*       404:
*         description: The restaurant was not found
*/



const appointmentRouter = require('./reservations');

const router = express.Router();

const {protect, authorize} = require('../middleware/auth');

router.use('/:hospitalId/appointments/',appointmentRouter);

router.route('/vacCenters').get(getVacCenters);
router.route('/').get(getHospitals).post(protect,authorize('admin'), createHospital);
router.route('/:id').get(getHospital).put(protect,authorize('admin'), updateHospital).delete(protect,authorize('admin'), deleteHospital);

module.exports=router;