define({ "api": [
  {
    "type": "post",
    "url": "/issues/:issueId/comments",
    "title": "Create comment for issue",
    "name": "CreateComment",
    "group": "Comment",
    "description": "<p>Create comment for issue specified issue</p>",
    "header": {
      "fields": {
        "RequestFileHeader": [
          {
            "group": "RequestFileHeader",
            "type": "String",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": false,
            "field": "Content-Type",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "issueId",
            "description": "<p>Issue id that comment belongs to</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Comment text</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Comment text</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Time of creation</p>"
          },
          {
            "group": "201",
            "type": "Object",
            "optional": false,
            "field": "issue",
            "description": "<p>Issue that belongs to</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal server error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/v1/comments/controller.js",
    "groupTitle": "Comment"
  },
  {
    "type": "get",
    "url": "/issues/:issueId/comments",
    "title": "Get issue comments",
    "name": "ListComments",
    "group": "Comment",
    "description": "<p>Get the comments for the issue with :issueId id</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "issueId",
            "description": "<p>Issue id that comment belongs to</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Page of the issues collection</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "defaultValue": "10",
            "description": "<p>Documents per page</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "Array",
            "description": "<p>of comments</p>"
          }
        ],
        "PaginationResponseHeader": [
          {
            "group": "PaginationResponseHeader",
            "type": "String",
            "optional": false,
            "field": "x-total-count",
            "description": "<p>Number of total documents</p>"
          },
          {
            "group": "PaginationResponseHeader",
            "type": "String",
            "optional": false,
            "field": "x-total-pages",
            "description": "<p>Number of total pages</p>"
          },
          {
            "group": "PaginationResponseHeader",
            "type": "String",
            "optional": false,
            "field": "x-current-page",
            "description": "<p>Current page</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal server error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/v1/comments/controller.js",
    "groupTitle": "Comment"
  },
  {
    "type": "get",
    "url": "/issues/:issueId/files/:id",
    "title": "Download specific file",
    "name": "DownloadFile",
    "group": "File",
    "description": "<p>Download file with id :id that belongs to issue with :issueId id</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "File",
            "optional": false,
            "field": "file",
            "description": "<p>Binary file</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Not found</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal server error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/v1/files/controller.js",
    "groupTitle": "File"
  },
  {
    "type": "post",
    "url": "/issues/:issueId/files",
    "title": "Upload an issue file",
    "name": "UploadFile",
    "group": "File",
    "description": "<p>Upload files for issue with :issueId id and returns changed issue along with newly uploaded files</p>",
    "header": {
      "fields": {
        "UploadFileHeader": [
          {
            "group": "UploadFileHeader",
            "type": "String",
            "allowedValues": [
              "\"multipart/form-data\""
            ],
            "optional": false,
            "field": "Content-Type",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File[]",
            "optional": false,
            "field": "files",
            "description": "<p>Array of uploading files</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the issue</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Time of creation</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "files",
            "description": "<p>Issue files</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "comments",
            "description": "<p>Issue comments</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal server error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/v1/files/controller.js",
    "groupTitle": "File"
  },
  {
    "type": "post",
    "url": "/issues",
    "title": "Create issue",
    "name": "CreateIssue",
    "group": "Issue",
    "description": "<p>Create issue with with specified or if not default status</p>",
    "header": {
      "fields": {
        "RequestFileHeader": [
          {
            "group": "RequestFileHeader",
            "type": "String",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": false,
            "field": "Content-Type",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"pending\"",
              "\"complete\""
            ],
            "optional": true,
            "field": "status",
            "defaultValue": "pending",
            "description": "<p>Issue status</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the Issue</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Time of creation</p>"
          },
          {
            "group": "201",
            "type": "Object",
            "optional": false,
            "field": "files",
            "description": "<p>Issue files</p>"
          },
          {
            "group": "201",
            "type": "Object",
            "optional": false,
            "field": "comments",
            "description": "<p>Issue comments</p>"
          }
        ],
        "400": [
          {
            "group": "400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Invalid value for status</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal server error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/v1/issues/controller.js",
    "groupTitle": "Issue"
  },
  {
    "type": "delete",
    "url": "/issues/:id",
    "title": "Delete the specified issue",
    "name": "DeleteIssue",
    "group": "Issue",
    "description": "<p>Delete the issue with :id</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Issue id that needs to be deleted</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Issue delete successfully info</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal server error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/v1/issues/controller.js",
    "groupTitle": "Issue"
  },
  {
    "type": "get",
    "url": "/issues/:id",
    "title": "Get issue",
    "name": "GetIssue",
    "group": "Issue",
    "description": "<p>Get issue with given :id with all of its files and with comment ids</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Issue id that needs to be deleted</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the Issue</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Time of creation</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "files",
            "description": "<p>Issue files</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "comments",
            "description": "<p>Issue comments' ids</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal server error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/v1/issues/controller.js",
    "groupTitle": "Issue"
  },
  {
    "type": "get",
    "url": "/issues",
    "title": "Get issues",
    "name": "GetIssues",
    "group": "Issue",
    "description": "<p>Get all the issues from the database using pagination</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Page of the issues collection</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "defaultValue": "10",
            "description": "<p>Documents per page</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "Array",
            "description": "<p>of issues</p>"
          }
        ],
        "PaginationResponseHeader": [
          {
            "group": "PaginationResponseHeader",
            "type": "String",
            "optional": false,
            "field": "x-total-count",
            "description": "<p>Number of total documents</p>"
          },
          {
            "group": "PaginationResponseHeader",
            "type": "String",
            "optional": false,
            "field": "x-total-pages",
            "description": "<p>Number of total pages</p>"
          },
          {
            "group": "PaginationResponseHeader",
            "type": "String",
            "optional": false,
            "field": "x-current-page",
            "description": "<p>Current page</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal server error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/v1/issues/controller.js",
    "groupTitle": "Issue"
  },
  {
    "type": "patch",
    "url": "/issues/:id",
    "title": "Update issue",
    "name": "UpdateIssue",
    "group": "Issue",
    "description": "<p>Update the issue with given :id</p>",
    "header": {
      "fields": {
        "RequestFileHeader": [
          {
            "group": "RequestFileHeader",
            "type": "String",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": false,
            "field": "Content-Type",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Issue id that needs to be deleted</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"pending\"",
              "\"complete\""
            ],
            "optional": true,
            "field": "status",
            "defaultValue": "pending",
            "description": "<p>Issue status</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the Issue</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Time of creation</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "files",
            "description": "<p>Issue files</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "comments",
            "description": "<p>Issue comments</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal server error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/v1/issues/controller.js",
    "groupTitle": "Issue"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "src/doc/main.js",
    "group": "_home_vagrant_florence_issues_src_doc_main_js",
    "groupTitle": "_home_vagrant_florence_issues_src_doc_main_js",
    "name": ""
  }
] });
