<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClassesHaveController extends Controller
{
    public function index()
    {
        try {
            $classData = DB::table('tblclass')->get();
            return response()->json($classData);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database Error: ' . $e->getMessage()], 500);
        }
    }

    public function update(Request $request)
    {
        try {
            $requestData = $request->json()->all();
            $eval = intval($requestData['Approved']);
            $id = $requestData['ID'];

            $affectedRows = DB::table('tblclass')
                ->where('ID', $id)
                ->update(['Approved' => $eval]);

            if ($affectedRows) {
                return response()->json(['status' => 1, 'message' => 'Record updated successfully.']);
            } else {
                return response()->json(['status' => 0, 'message' => 'Failed to update record.']);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database Error: ' . $e->getMessage()], 500);
        }
    }
}
