<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TblAdmin extends Model
{
    protected $table = 'tbladmin';
    protected $primaryKey = 'ID';
    protected $fillable = ['AdminName', 'UserName', 'MobileNumber', 'Email', 'Password', 'AdminRegdate'];
}
