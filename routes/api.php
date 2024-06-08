<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\UserIdLoginController;
use App\Http\Controllers\ProgramCoordinatorController;
use App\Http\Controllers\MarksController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AnswersController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ChatHomeController;
use App\Http\Controllers\ClassesController;
use App\Http\Controllers\ClassesHaveController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\EmailLoginController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\GetQuestionsController;
use App\Http\Controllers\GetUserStatsController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\QAOController;
use App\Http\Controllers\sendPasswordResetCodeController;
use App\Http\Controllers\StatisticsController;
use App\Http\Controllers\StudentsController;
use App\Http\Controllers\submitExamController;
use App\Http\Controllers\UpdateMarksController;
use App\Http\Controllers\UpdateQaoController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\VerifyOTPController;


Route::post('/signup', [UserController::class, 'signUp']);

Route::group(['prefix' => 'admin'], function () {
    Route::get('/getUsers', [AdminController::class, 'getUsers']);
    Route::post('/deleteUser', [AdminController::class, 'deleteUser']);

});

Route::post('/insertAnswer', [AnswersController::class, 'insertAnswer']);
Route::post('/sendMessage', [ChatController::class, 'sendMessage']);
Route::get('/getChatUsers', [ChatHomeController::class, 'getChatUsers']);
Route::get('/getClasses', [ClassesController::class, 'getClasses']);

Route::group(['prefix' => 'classeshave'], function () {
    Route::get('/index', [ClassesHaveController::class, 'index']);
    Route::post('/update', [ClassesHaveController::class, 'update']);

});

Route::group(['prefix' => 'course'], function () {
    Route::get('/getCourseCatalog', [CourseController::class, 'getCourseCatalog']);
    Route::post('/updateCourseContent', [CourseController::class, 'updateCourseContent']);

});

Route::get('/emaillogin', [EmailLoginController::class, 'emaillogin']);
Route::get('/checkExamExists', [ExamController::class, 'checkExamExists']);
Route::get('/getQuestions', [GetQuestionsController::class, 'getQuestions']);

Route::group(['prefix' => 'instructor'], function () {
    Route::get('/getInstructors', [InstructorController::class, 'getInstructors']);
    Route::post('/deleteInstructor', [InstructorController::class, 'deleteInstructor']);

});

Route::group(['prefix' => 'QAO'], function () {
    Route::get('/getQAOs', [QAOController::class, 'getQAOs']);
    Route::post('/deleteQAO', [QAOController::class, 'deleteQAO']);

});

Route::get('/getUserStats', [GetUserStatsController::class, 'getUserStats']);
Route::get('/getUsers', [UsersController::class, 'getUsers']);
Route::get('/getStatistics', [StatisticsController::class, 'getStatistics']);
Route::get('/getStudents', [StudentsController::class, 'getStudents']);

Route::get('/login', [UserIdLoginController::class, 'login']);


Route::get('/programcoordinators', [ProgramCoordinatorController::class, 'getProgramCoordinators']);
Route::post('/deleteprogramcoordinator', [ProgramCoordinatorController::class, 'deleteProgramCoordinator']);
Route::post('/updateInstructorResult', [UpdateMarksController::class, 'updateInstructorResult']);
Route::post('/updateQAOResult', [UpdateQaoController::class, 'updateQAOResult']);

Route::group(['prefix' => 'marks'], function () {
    Route::get('/', [MarksController::class, 'getMarks']);
});

Route::post('/sendPasswordResetCode', [sendPasswordResetCodeController::class, 'sendPasswordResetCode']);
Route::post('/insertAnswersAndMarks', [submitExamController::class, 'insertAnswersAndMarks']);

Route::post('/sendresetemail', [PasswordResetController::class, 'sendResetEmail']);
Route::post('/changepassword', [PasswordResetController::class, 'changePassword']);
Route::post('/verifyOTP', [VerifyOTPController::class, 'verifyOTP']);
