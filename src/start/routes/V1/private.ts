import { Permissions } from '@vulpee/js-api';

const Route = use('Route');
const Helpers = use('Helpers');

/*
|--------------------------------------------------------------------------
| PRIVATE API [1.0]
|
| Routes for the privately available APIs for the front-end applications
|--------------------------------------------------------------------------
*/

Route.get('/1.0', async ({ request, response }) => {
  const bestFormat = request.accepts(['json', 'html']);

  if (bestFormat === 'json') {
    return { message: 'Welcome to the Vulpee 1.0 API' };
  }

  response.download(Helpers.resourcesPath('docs/v1.html'));
});

/*
|--------------------------------------------------------------------------
| AUTHENTICATION
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.post('/sign-in', 'Private/V1/AuthController.signIn').validator('Authentication/Login');

  Route.post('/logout', 'Private/V1/AuthController.logout');

  Route.post('/forgot-password', 'Private/V1/AuthController.forgotPassword').validator('Authentication/ForgotPassword');

  Route.post('/reset-password', 'Private/V1/AuthController.resetPassword').validator('Authentication/ResetPassword');

  Route.post('/verify', 'Private/V1/AuthController.verify').middleware(['auth']);
}).prefix('1.0/auth');

/*
|--------------------------------------------------------------------------
| USERS
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.get('/me', 'Private/V1/UserController.me');
})
  .middleware(['auth'])
  .prefix('1.0/users');

/*
|--------------------------------------------------------------------------
| ESTABLISHMENTS
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.get('/', 'Private/V1/EstablishmentController.index');

  Route.get('/:establishment', 'Private/V1/EstablishmentController.get').middleware([
    `can:${Permissions.ViewEstablishment}`,
  ]);
})
  .middleware(['auth'])
  .prefix('1.0/establishments');

/*
|--------------------------------------------------------------------------
| ESTABLISHMENT TOKENS
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.get('/', 'Private/V1/EstablishmentTokenController.index').middleware([
    `can:${Permissions.ViewEstablishmentToken}`,
  ]);

  Route.post('/', 'Private/V1/EstablishmentTokenController.create')
    .middleware([`can:${Permissions.CreateEstablishmentToken}`])
    .validator('Establishment/Token');

  Route.put('/:id', 'Private/V1/EstablishmentTokenController.edit')
    .middleware([`can:${Permissions.EditEstablishmentToken}`])
    .validator('Establishment/Token');

  Route.patch('/:id', 'Private/V1/EstablishmentTokenController.regenerate').middleware([
    `can:${Permissions.EditEstablishmentToken}`,
  ]);

  Route.delete('/:id', 'Private/V1/EstablishmentTokenController.delete').middleware([
    `can:${Permissions.DeleteEstablishmentToken}`,
  ]);
})
  .middleware(['auth'])
  .prefix('1.0/establishments/:establishment/tokens');

/*
|--------------------------------------------------------------------------
| ACCOMMODATIONS
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.get('/', 'Private/V1/AccommodationController.index').middleware([`can:${Permissions.ViewAccommodation}`]);

  Route.get('/categories', 'Private/V1/AccommodationController.categories').middleware([
    `can:${Permissions.ViewAccommodation}`,
  ]);

  Route.get('/categories/:category', 'Private/V1/AccommodationController.category').middleware([
    `can:${Permissions.ViewAccommodation}`,
  ]);

  Route.get('/:accommodation', 'Private/V1/AccommodationController.get').middleware([
    `can:${Permissions.ViewAccommodation}`,
  ]);
})
  .middleware(['auth'])
  .prefix('1.0/establishments/:establishment/accommodations');

/*
|--------------------------------------------------------------------------
| RENTALS
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.get('/', 'Private/V1/RentalController.index').middleware([`can:${Permissions.ViewRental}`]);

  Route.get('/categories', 'Private/V1/RentalController.categories').middleware([`can:${Permissions.ViewRental}`]);

  Route.get('/categories/:category', 'Private/V1/RentalController.category').middleware([
    `can:${Permissions.ViewRental}`,
  ]);

  Route.get('/:rental', 'Private/V1/RentalController.get').middleware([`can:${Permissions.ViewRental}`]);
})
  .middleware(['auth'])
  .prefix('1.0/establishments/:establishment/rentals');
