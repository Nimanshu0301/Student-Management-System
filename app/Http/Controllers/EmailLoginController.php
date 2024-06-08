<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TblUsers;
use Illuminate\Support\Facades\DB;

class EmailLoginController extends Controller
{
    public function login(Request $request)
    {
        $this->validate($request, [
            'username' => 'required|email',
            'password' => 'required',
        ]);

        $user = DB::table('tblusers')
            ->select('ID', 'UserType', 'status')
            ->where('Email', $request->username)
            ->where('Password', $request->password)
            ->first();

        if (!$user) {
            return response()->json(['status' => 0, 'message' => 'Incorrect email or password']);
        }

        if ($user->status !== 'verified') {
            $info = "It looks like you haven't verified your email - $request->username";
            return response()->json(['status' => 0, 'message' => $info]);
        }

        return response()->json([
            'status' => 1,
            'message' => 'Login successful',
            'UserType' => $user->UserType,
            'ID' => $user->ID,
        ]);
    }
}
