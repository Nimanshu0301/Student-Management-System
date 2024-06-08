<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CourseController extends Controller
{
    public function getCourseCatalog()
    {
        try {
            // Set CORS headers
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Headers: *');
            header('Access-Control-Allow-Methods: *');

            if (request()->isMethod('GET')) {
                $catalogData = DB::table('tblclass')
                    ->select('CourseID', 'ClassName', 'Content')
                    ->get()
                    ->toArray();

                $response = [
                    'CourseCatalog' => $catalogData
                ];

                return response()->json($response);
            } else {
                return response()->json(['error' => 'Invalid request method.'], 405);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database Error: ' . $e->getMessage()], 500);
        }
    }

    public function updateCourseContent(Request $request)
    {
        try {
            // Set CORS headers
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Headers: *');
            header('Access-Control-Allow-Methods: *');

            if ($request->isMethod('POST')) {
                $data = $request->json()->all();

                $CourseId = $data['CourseId'];
                $Content = $data['Content'];

                $affectedRows = DB::table('tblclass')
                    ->where('CourseID', $CourseId)
                    ->update(['Content' => $Content]);

                if ($affectedRows > 0) {
                    return response()->json(['message' => 'Content updated successfully']);
                } else {
                    return response()->json(['message' => 'Failed to update content']);
                }
            } else {
                return response()->json(['error' => 'Invalid request method.'], 405);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database Error: ' . $e->getMessage()], 500);
        }
    }
}
