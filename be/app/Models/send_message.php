<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class send_message extends Model
{
     use HasFactory;
    protected $table = 'recipient_table';
    public $timestamps = false;
}

