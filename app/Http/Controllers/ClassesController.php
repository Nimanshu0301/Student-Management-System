<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClassesController extends Controller
{
    public function getClasses(Request $request)
    {
        try {
            // Set CORS headers
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Headers: *');
            header('Access-Control-Allow-Methods: *');

            if ($request->isMethod('GET')) {
                $classData = DB::table('tblclass')->get();

                return response()->json($classData);
            } elseif ($request->isMethod('POST')) {
                $requestData = json_decode($request->getContent());

                $classId = $requestData->ID;
                $className = $requestData->ClassName;
                $courseId = $requestData->CourseID;
                $timings = $requestData->Timings;
                $credits = $requestData->Credits;
                $instructor = $requestData->Instructor;

                $result = DB::table('tblclass')
                    ->where('ID', $classId)
                    ->update([
                        'ClassName' => $className,
                        'CourseID' => $courseId,
                        'Timings' => $timings,
                        'Credits' => $credits,
                        'Instructor' => $instructor
                    ]);

                $response = [
                    'status' => 0,
                    'message' => 'Failed to update record.'
                ];

                if ($result) {
                    $response = [
                        'status' => 1,
                        'message' => 'Record updated successfully.'
                    ];
                }

                return response()->json($response);
            } else {
                return response()->json(['error' => 'Invalid request method.'], 405);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database Error: ' . $e->getMessage()], 500);
        }
    }
}
