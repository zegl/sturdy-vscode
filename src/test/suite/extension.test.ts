import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';

import { AlertMessageForConflicts, Conflict } from '../../conflicts';

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('Sample test', () => {
        assert.strictEqual(-1, [1, 2, 3].indexOf(5));
        assert.strictEqual(-1, [1, 2, 3].indexOf(0));
    });

    test('conflict messages', async () => {
        let conflicts: Array<Conflict> = [
             {
                id: "abc123",
                repository_id: "abc123",
                base: "111111",
                onto: "222222",
                onto_name: "master",
                onto_reference_type: "",
                onto_reference_id: "",
                conflicting: true,
                is_conflict_in_working_directory: false,
                conflicting_commit: "7f4ecbdceeb365f61384c30c4f13e05b8da0f50d",
                checked_at: "2021-02-02",
                user_id: "abc123",
                commit_message: "This is a commit message, actually.\nAnd here it is on the next line.",
                conflicting_files: ["a.txt", "foo.txt"],
             },

              // Another one with no conflict
              {
                id: "abc123",
                repository_id: "abc123",
                base: "111111",
                onto: "444444",
                onto_name: "not-master",
                onto_reference_type: "",
                onto_reference_id: "",
                conflicting: false,
                is_conflict_in_working_directory: false,
                conflicting_commit: "",
                checked_at: "2021-02-02",
                user_id: "abc123",
                commit_message: "",
                conflicting_files: [],
             }
        ];

        let res = AlertMessageForConflicts([{
            repoOwner: "sturdy-dev",
            repoName: "sturdy-vscode",
            conflicts: {
                conflicts: conflicts,
            }
        }]);

        assert.strictEqual(res.anyConflicts, true)
        assert.strictEqual(res.message, "Your changes in 7f4ecbdc [\"This is a commit message, actually.\"] are conflicting with master. ");
    });

    test('conflict messages working directory', async () => {
        let conflicts: Array<Conflict> = [
            {
                id: "abc123",
                repository_id: "abc123",
                base: "111111",
                onto: "222222",
                onto_name: "master",
                onto_reference_type: "",
                onto_reference_id: "",
                conflicting: true,
                is_conflict_in_working_directory: true,
                conflicting_commit: "",
                checked_at: "2021-02-02",
                user_id: "abc123",
                commit_message: "",
                conflicting_files: ["a.txt", "foo.txt"],
             },

             // Conflict with PR
             {
                id: "abc123",
                repository_id: "abc123",
                base: "111111",
                onto: "222222",
                onto_name: "github-pr-123",
                onto_reference_type: "github-pr",
                onto_reference_id: "123",
                conflicting: true,
                is_conflict_in_working_directory: true,
                conflicting_commit: "",
                checked_at: "2021-02-02",
                user_id: "abc123",
                commit_message: "",
                conflicting_files: ["a.txt", "foo.txt"],
             },

             // Another one with no conflict
             {
                id: "abc123",
                repository_id: "abc123",
                base: "111111",
                onto: "444444",
                onto_name: "not-master",
                onto_reference_type: "",
                onto_reference_id: "",
                conflicting: false,
                is_conflict_in_working_directory: false,
                conflicting_commit: "",
                checked_at: "2021-02-02",
                user_id: "abc123",
                commit_message: "",
                conflicting_files: [],
             }
        ];

        let res = AlertMessageForConflicts([{
            repoOwner: "sturdy-dev",
            repoName: "sturdy-vscode",
            conflicts: {
                conflicts: conflicts,
            }
        }]);

        assert.strictEqual(res.anyConflicts, true)
        assert.strictEqual(res.message, "Your uncommitted changes are conflicting with master, #123. ");
    });

    test('conflict messages no conflicts', async () => {
        let conflicts: Array<Conflict> = [
            {
                id: "abc123",
                repository_id: "abc123",
                base: "111111",
                onto: "222222",
                onto_name: "master",
                onto_reference_type: "",
                onto_reference_id: "",
                conflicting: false,
                is_conflict_in_working_directory: false,
                conflicting_commit: "",
                checked_at: "2021-02-02",
                user_id: "abc123",
                commit_message: "",
                conflicting_files: [],
             }
        ];

        let res = AlertMessageForConflicts([{
            repoOwner: "sturdy-dev",
            repoName: "sturdy-vscode",
            conflicts: {
                conflicts: conflicts,
            }
        }]);

        assert.strictEqual(res.anyConflicts, false)
    });
});
