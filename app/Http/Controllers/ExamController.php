<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ExamController extends Controller
{
    public function checkExamExists(Request $request)
    {
        try {
            // Set CORS headers
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Headers: *');
            header('Access-Control-Allow-Methods: *');

            if ($request->isMethod('GET')) {
                $userID = $request->input('UserID');
                $courseID = $request->input('CourseID');

                if ($userID !== null && $courseID !== null) {
                    $result = DB::table('tblanswers')
                        ->where('UserID', $userID)
                        ->where('CourseID', $courseID)
                        ->count();

                    return response()->json(['examExists' => $result > 0]);
                } else {
                    return response()->json(['error' => 'Invalid parameters.'], 400);
                }
            } else {
                return response()->json(['error' => 'Invalid request method.'], 405);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database Error: ' . $e->getMessage()], 500);
        }
    }
}
