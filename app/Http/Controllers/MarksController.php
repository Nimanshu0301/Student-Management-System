<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MarksController extends Controller
{
    public function getMarks(Request $request)
    {
        try {
            // Set CORS headers
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Headers: *');
            header('Access-Control-Allow-Methods: *');

            if ($request->isMethod('GET')) {
                $userID = $request->query('UserID');

                $courseIDs = DB::table('tblclass')->pluck('CourseID')->toArray();
                $courseData = [];

                foreach ($courseIDs as $courseID) {
                    $course = [
                        'CourseID' => $courseID,
                        'Given' => 'No',
                        'InstructorResult' => null,
                        'QAOResult' => null,
                        'Marks' => null
                    ];

                    $resultCheckGiven = DB::table('tblanswers')
                        ->where('UserID', $userID)
                        ->where('CourseID', $courseID)
                        ->first();

                    if ($resultCheckGiven) {
                        $course['Given'] = 'Yes';
                    }

                    $results = DB::table('tblmarks')
                        ->select('InstructorResult', 'QAOResult')
                        ->where('CourseID', $courseID)
                        ->where('StudentID', $userID)
                        ->first();

                    if ($results) {
                        $course['InstructorResult'] = $results->InstructorResult;
                        $course['QAOResult'] = $results->QAOResult;
                    }

                    $marks = DB::table('tblmarks')
                        ->select('Marks')
                        ->where('CourseID', $courseID)
                        ->where('StudentID', $userID)
                        ->first();

                    if ($marks) {
                        $course['Marks'] = $marks->Marks;
                    }

                    $courseData[] = $course;
                }

                return response()->json($courseData);
            } else {
                return response()->json(['error' => 'Invalid request method.'], 405);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database Error: ' . $e->getMessage()], 500);
        }
    }
}
